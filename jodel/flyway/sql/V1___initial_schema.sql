/* Create your schema here */
create table if not exists users (
    id serial primary key,
    token varchar(255) not null
);
create table IF NOT EXISTS messages(
    id serial primary key,
    content varchar(255) not null,
    votes int default 0,
    user_id int references users(id) not null,
    time timestamp default current_timestamp(0)
);
create table IF NOT EXISTS replies(
    id serial primary key,
    message_id int references messages(id) not null,
    content varchar(255) not null,
    user_id int references users(id) not null
);