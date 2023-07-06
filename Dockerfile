FROM node:18.16.1-alpine3.18 AS packages

WORKDIR /home/app

# Install node_modules
COPY package*.json .
RUN npm ci

# development stage to run the app with hot reload available
# That's why we don't need the build for this stage
FROM packages AS development

# Only needed for inter-container communication
# EXPOSE 8000
HEALTHCHECK CMD curl --fail http://localhost:8000 || exit 1
CMD [ "npm", "run", "dev" ]

# Need to add the volumes to allow the hot reload
# volumes:
#     - ./src:/home/app/src
#     - ./dist:/home/app/dist
#     - ./tsconfig.json:/home/app/tsconfig.json
#     - ./.env:/home/app/.env

# BTW, the FROM statement using a previous stage as source
# will simply continue the image building
FROM packages AS build

# Compile TS to JS
COPY src ./src
COPY tsconfig.json .
RUN npm run build

# This is how we start a clean image for production,
# and only copying the minimal files to run the app
FROM node:18.16.1-alpine3.18 AS production

WORKDIR /home/app

COPY package.json .
COPY --from=packages /home/app/node_modules ./node_modules
COPY --from=build /home/app/dist ./dist

# RUN npm prune --omit=dev

# EXPOSE 8000
HEALTHCHECK CMD curl --fail http://localhost:8000 || exit 1

# It is a best practice to use a non-root user for security.
USER node

CMD [ "npm", "start" ]