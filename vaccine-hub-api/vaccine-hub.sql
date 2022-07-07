\ echo 'Delete and recreate vaccine-hub db'
\prompt 'Return for yes or control-C o cancel>' answer

DROP DATABASE vaccine-hub;
CREATE DATABASE vaccine-hub;
\connect vaccine-hub;

\i vaccine-hub-schema.sql
