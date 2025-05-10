if exist "C:\" (
    rem Running on Windows
    set DB_PATH=out\\db
) else (
    rem Running on Linux/Mac
    set "DB_PATH=out/db"
)

if not exist "%DB_PATH%" (
    mkdir "%DB_PATH%"
)

mongod --port 3000 --dbpath %DB_PATH%