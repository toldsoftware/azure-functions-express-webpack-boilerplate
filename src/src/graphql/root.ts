import { log } from '../log';

function getFriends(obj: Human) {
    log('getFriends', obj);
    return obj.friendIds.map(x => getHuman(x));
}

interface Human {
    id: string;
    name: string;
    appearsIn: string[];
    totalCredits: number;
    friendIds: string[];
    friends: ((obj: any, args: any, context: any) => Human[]);
}

function getHuman(id: string): Human {

    if (id === '101') {
        return {
            id: '101',
            name: 'Luke',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friendIds: ['102'],
            friends() { return getFriends(this); }
        };
    } else if (id === '102') {
        return {
            id: '102',
            name: 'Princess',
            appearsIn: ['NEWHOPE'],
            totalCredits: 5,
            friendIds: ['101'],
            friends() { return getFriends(this); }
        };
    }

    return null;
}

export const root = {
    test: () => getHuman('101'),
    hero: (args: { id: string }) => getHuman(args.id),
    // human: (obj: any, args: { id: string }, context: any) => getHuman(args.id)
};
