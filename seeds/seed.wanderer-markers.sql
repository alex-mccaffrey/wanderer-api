BEGIN;

TRUNCATE users, markers RESTART IDENTITY CASCADE;

INSERT INTO users
    (username, password)
    VALUES
    ('testuser1', 'password');

INSERT INTO markers (id, user_id, name, notes, latitude, longitude, timeAdded)
VALUES
    (
        1,
        1,
        'Buck',
        'this is a note',
        '39.780899',
        '-105.0273788',
        '2021-05-05 00:00:00'
    ),
    (
        2, 
        1,
        'Alex',
        'this is also a note',
        '39.778888',
        '-104.8721969',
        '2021-04-29 00:00:00'
    ),
    (
        3,
        1, 
        'Mike',
        'this is another note',
        '39.714322',
        '-104.949101259',
        '2021-05-02 00:00:00'
    ),
    (
        4,
        1, 
        'Tori',
        'this is not a note',
        '39.78373822',
        '-105.080186',
        '2021-05-01 00:00:00'
    ),
    (
        5,
        1, 
        'Leo',
        'this is stuff',
        '39.781999',
        '-105.0273788',
        '2021-04-30 00:00:00'
    ),
    (
        6,
        1, 
        'Allison',
         'Hi there',
        '39.728778',
        '-104.8721969',
        '2021-05-08 00:00:00'
    ),
    (
        7,
        1, 
        'Jack',
        'What is this?',
        '39.775381',
        '-104.949101259',
        '2021-05-09 00:00:00'
    ),
    (
        8,
        1, 
        'Piper',
        'Im a dog',
        '39.78373822',
        '-105.080186',
        '2021-04-28 00:00:00'
    );


    COMMIT;