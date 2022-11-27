/* Create your schema here */
create table if not exists users (
    id serial primary key,
    token varchar(255) not null
);


create table IF NOT EXISTS problems(
    id serial primary key,
    problem_id varchar(255) not null,
    ifSaved varchar(255) not null,
    solution varchar(255) not null,
    user_id int references users(id) not null
);

