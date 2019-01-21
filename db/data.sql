insert into users (id, created_at, name) values
	(1, (now() - interval '175 days, 5 hours'), 'Alice'),
	(2, (now() - interval '154 days, 7 hours'), 'Bob'),
	(3, (now() - interval '124 days, 1 hours'), 'Carl'),
	(4, (now() - interval '101 days, 4 hours'), 'Daphne'),
	(5, (now() - interval '89 days, 6 hours'), 'Evan'),
	(6, (now() - interval '75 days, 2 hours'), 'Fabia'),
    (7, (now() - interval '89 days, 6 hours'), 'Abby'),
	(8, (now() - interval '75 days, 2 hours'), 'Ben'),
    (9, (now() - interval '89 days, 6 hours'), 'Rob'),
	(10, (now() - interval '75 days, 2 hours'), 'Tim'),
    (11, (now() - interval '75 days, 2 hours'), 'Tom'),
    (12, (now() - interval '75 days, 2 hours'), 'Jack')
;

insert into companies (id, created_at, name) values
	(1, (now() - interval '250 days'), 'Facewall'),
	(2, (now() - interval '300 days, 2 hours'), 'Company & Co'),
    (3, (now() - interval '290 days, 2 hours'), 'Company C'),
    (4, (now() - interval '200 days, 2 hours'), 'Company D'),
    (5, (now() - interval '100 days, 2 hours'), 'Company E'),
    (6, (now() - interval '250 days, 2 hours'), 'Company F'),
    (7, (now() - interval '120 days, 2 hours'), 'Company G'),
    (8, (now() - interval '330 days, 2 hours'), 'Company H')
;

insert into teams (company_id, user_id, contact_user) values
	(1, 1, TRUE),
	(2, 3, FALSE),
	(2, 4, TRUE),
    (3, 5, TRUE),
    (2, 2, TRUE),
    (6, 3, FALSE),
    (7, 6, FALSE),
    (8, 5, FALSE)
;

insert into listings (id, created_at, created_by, name, description) values
	(1, (now() - interval '170 days'), 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
    (2, (now() - interval '170 days'), 3, 'Listing 2', 'description...'),
    (3, (now() - interval '177 days'), 4, 'Listing 3', 'This is your description...'),
    (4, (now() - interval '130 days'), 1, 'Listing 4', 'This description...'),
    (5, (now() - interval '140 days'), 1, 'Listing 5', 'This is your best description...'),
    (6, (now() - interval '160 days'), 2, 'Listing 6', 'This is your best description...'),
    (7, (now() - interval '110 days'), 5, 'Listing 7', 'This is your best description...')
;

insert into applications (id, created_at, user_id, listing_id, cover_letter) values
	(1, (now() - interval '165 days'), 1, 1, 'Hello, I am Alice'),
	(2, (now() - interval '164 days'), 1, 2, 'Hello, I am Alice'),
    (3, (now() - interval '115 days'), 1, 3, 'Hello, I am Alice'),
    (4, (now() - interval '125 days'), 1, 4, 'Hello, I am Alice'),
    (5, (now() - interval '185 days'), 1, 5, 'Hello, I am Alice'),
    (6, (now() - interval '45 days'), 2, 3, 'Hello, I am Bob'),
    (7, (now() - interval '95 days'), 2, 4, 'Hello, I am Bob'),
    (8, (now() - interval '115 days'), 2, 5, 'Hello, I am Bob'),
    (9, (now() - interval '55 days'), 2, 6, 'Hello, I am Bob'),
    (10, (now() - interval '185 days'), 3, 3, 'Hello, I am Carl'),
    (11, (now() - interval '195 days'), 3, 4, 'Hello, I am Carl'),
    (12, (now() - interval '185 days'), 4, 3, 'Hello!!'),
    (13, (now() - interval '185 days'), 5, 3, 'Hello!'),
    (14, (now() - interval '185 days'), 6, 3, 'Hello!'),
    (15, (now() - interval '185 days'), 7, 4, 'Hello!'),
    (16, (now() - interval '185 days'), 8, 5, 'Hello!'),
    (17, (now() - interval '185 days'), 9, 2, 'Hello!'),
    (18, (now() - interval '185 days'), 10, 1, 'Hello!'),
    (19, (now() - interval '185 days'), 11, 2, 'Hello!'),
    (20, (now() - interval '185 days'), 11, 3, 'Hello!'),
    (21, (now() - interval '185 days'), 12, 6, 'Hello!')
;