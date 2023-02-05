# add permission to node_modules
chmod -R 777 ./node_modules

# generate prisma client
npx prisma generate

# push prisma model to db
npx prisma db push

# start dev server
yarn dev
