function welcome(name: string) {
    console.log('Welcome' + name);
    const username = {
        name: 'hammad',
    };

    const u1 = username['name'];

    return u1;
}

welcome('hammad');
