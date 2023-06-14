create database ScaryIt;
use ScaryIt;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(20),
email varchar(30),
senha varchar(20)
);

create table antagonistaFavorito (
nome varchar(45),
fkUsuario int,
constraint fkUsuario foreign key antagonistaPreferido(fkUsuario) references usuario(idUsuario)
);

insert into usuario values 
(null, "Miguel", "Miguel@Ggmail.com", "123"),
(null, "Lucas", "Lucas@gmail.com", "123"),
(null, "Marcos", "Marcos@gmail.com", "123"),
(null, "Erick", "Erick@gmail.com", "123"),
(null, "Matheus", "Matheus@gmail.com", "123");

create table quiz (
idQuiz int primary key auto_increment,
fkUsuario int,
constraint respostasQuiz foreign key quiz(fkUsuario) references usuario(idUsuario),
pontuacao varchar(2),
tentativas varchar(3)
);

create table filme (
idFilme int primary key, 
nome varchar(20),
anoLancamento date
);

create table indicacao (
fkFilme int,
constraint fkFilme foreign key indicacao(fkFilme) references filme(idFilme),
fkUsuario int,
constraint fkUsuario foreign key indicacao(fkUsuario) references usuario(idUsuario)
);

insert into quiz values 
(null, 1 , 10 , 2),
(null, 2 , 8 , 2),
(null, 3 , 7 , 2),
(null, 4 , 1 , 2),
(null, 5 , 5 , 2);

select usuario.nome, quiz.pontuacao from usuario join quiz on  idUsuario = fkUsuario order by pontuacao desc limit 10;

drop database ScaryIt;

select * from quiz;
select * from usuario;
truncate table usuario;
truncate table quiz;