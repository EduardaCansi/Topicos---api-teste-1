mongod --port 27018 --dbpath C:\Users\Usuario\Documents\topicos1\mongo\baserequisicao --auth

rem mongod --port 27018 --dbpath C:\Users\Usuario\Documents\topicos1\mongo\baserequisicao

rem mongo --port 27018
rem use baseRequisicao

rem db.createUser( {
rem user: "admin",
rem pwd: "admin",
rem roles: [ { role: "userAdminAnyDatabase", db: "admin" },
rem { role: "dbAdminAnyDatabase", db: "admin" },
rem { role: "readWriteAnyDatabase", db: "admin" } ]
rem } );



rem mongo -u "admin" -p "admin" --authenticationDatabase "baseRequisicao" --port 27018   ---com autenticação
rem compass e node:  mongodb://admin:admin@localhost:27018/baseRequisicao?authSource=baseRequisicao