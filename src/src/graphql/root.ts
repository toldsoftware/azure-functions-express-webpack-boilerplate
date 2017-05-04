function getHuman(id: number) {
    if (id === 101) {
        return {
            id: 101,
            name: 'Luke',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friends: [102]
        };
    } else if (id === 102) {
        return {
            id: 102,
            name: 'Princess',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friends: [101]
        };
    }

    return null;
}

export const root = {
    test: () => getHuman(101),
    hero: (id: number) => getHuman(id)
};
