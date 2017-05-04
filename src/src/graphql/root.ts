
function getFriends(obj: { friendIds: number[] }, args: any, context: any) {
    if (!obj || !obj.friendIds) { return []; }
    return obj.friendIds.map(x => getHuman(x));
}

function getHuman(id: number) {

    if (id === 101) {
        return {
            id: 101,
            name: 'Luke',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friendIds: [102],
            friends: getFriends
        };
    } else if (id === 102) {
        return {
            id: 102,
            name: 'Princess',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friendIds: [101],
            friends: getFriends
        };
    }

    return null;
}

export const root = {
    test: () => getHuman(101),
    hero: (id: number) => getHuman(id),
    // human: (obj: any, args: { id: number }, context: any) => getHuman(args.id)
};
