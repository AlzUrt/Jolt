composer install
php bin/console doctrine:database:create
symfony server:start

php bin/console doctrine:migrations:migrate
php bin/console doctrine:migrations:migrate --env=test


npm install
npm run start

site on https://jolt-app.site
