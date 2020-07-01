var shell = require('shelljs');

shell.cp('-R', 'src/www', 'build/www');
shell.cp('-R', '.env.prod', 'build/.env');
shell.cp('-R', 'ormconfig.prod.json', 'build/ormconfig.json');
shell.cp('-R', 'package.json', 'build/');
shell.cp('-R', 'node_modules', 'build/node_modules');
