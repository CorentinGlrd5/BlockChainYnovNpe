Create table PAGE (
num int references
PAGE(num),
txt text,
titre_Livre text,
Autheur text,

PRIMARY KEY (num)
);


Create table BLOCK (
hash_precedent text,
prof text,
num_block int,
time_stamp date,
num int,
contenu text,

PRIMARY key (num),
CONSTRAINT NumBlock foreign key (num)
REFERENCES PAGE (num)
);