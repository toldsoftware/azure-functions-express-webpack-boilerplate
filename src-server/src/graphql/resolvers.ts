import { QueryResolver, Human, HumanResolver, Episode } from './schema.types.generated';
import { log } from '../log';

function getFriends(obj: HumanPartial) {
    log('getFriends', obj);
    return obj.friendIds.map(x => getHuman(x));
}

function getEnemies(obj: HumanPartial) {
    log('getEnemies', obj);
    return obj.enemyIds.map(x => getHuman(x));
}

interface HumanPartial extends HumanResolver {
    friendIds?: string[];
    enemyIds?: string[];
}

function getHuman(id: string): HumanPartial {

    if (id === '101') {
        return {
            id: '101',
            name: 'Luke Skywalker',
            appearsIn: [Episode.NEWHOPE],
            totalCredits: 5,
            friendIds: ['102'],
            friends() { return getFriends(this); },
            enemyIds: ['103'],
            enemies() { return getEnemies(this); },
        };
    } else if (id === '102') {
        return {
            id: '102',
            name: 'Princess Leia',
            appearsIn: [Episode.NEWHOPE],
            totalCredits: 5,
            friendIds: ['101'],
            friends() { return getFriends(this); },
            enemyIds: ['103'],
            enemies() { return getEnemies(this); },
        };
    } else if (id === '103') {
        return {
            id: '103',
            name: 'Darth Vader',
            appearsIn: [Episode.NEWHOPE],
            totalCredits: 5,
            friendIds: [],
            friends() { return getFriends(this); },
            enemyIds: ['101', '102'],
            enemies() { return getEnemies(this); },
        };
    }

    return null;
}

export const rootResolver = {
    test: () => getHuman('101'),
    hero: (args: { id: string }) => getHuman(args.id),
    // human: (obj: any, args: { id: string }, context: any) => getHuman(args.id)
};
