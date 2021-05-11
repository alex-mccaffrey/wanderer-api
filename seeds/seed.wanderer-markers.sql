BEGIN;

TRUNCATE users, markers RESTART IDENTITY CASCADE;

INSERT INTO users
    (username, password)
    VALUES
    ('testuser1', 'Password1234!');

INSERT INTO markers (id, user_id, name, notes, latitude, longitude, timeAdded)
VALUES
    (
        1,
        1,
        'Buck',
        'this is a note',
        '39.85368875799711',
        '-105.14618282695312',
        '2021-05-05 00:00:00'
    ),
    (
        2, 
        1,
        'Alex',
        'this is also a note',
        '39.826272715380114',
        '-104.84680538554687',
        '2021-04-29 00:00:00'
    ),
    (
        3,
        1, 
        'Mike',
        'this is another note',
        '39.75662899673426',
        '-105.22308712382812',
        '2021-05-02 00:00:00'
    ),
    (
        4,
        1, 
        'Tori',
        'this is not a note',
        '39.58538652323097',
        '-105.14343624492187',
        '2021-05-01 00:00:00'
    ),
    (
        5,
        1, 
        'Leo',
        'this is stuff',
        '39.900060199610635',
        '-105.21759395976562',
        '2021-04-30 00:00:00'
    ),
    (
        6,
        1, 
        'Allison',
         'Hi there',
        '39.74395892789533',
        '-104.69848995585937',
        '2021-05-08 00:00:00'
    ),
    (
        7,
        1, 
        'Jack',
        'What is this?',
        '39.51973700616637',
        '-105.12146358867187',
        '2021-05-09 00:00:00'
    ),
    (
        8,
        1, 
        'Piper',
        'Im a dog',
        '39.53668476412618',
        '-104.99237423320312',
        '2021-04-28 00:00:00'
    );


    COMMIT;