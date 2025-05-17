import request from '../utils/request';

export function selectMinion(name, cost, cardClass, cardSet, rule, attack, health, rarity, race) {
    let requestUrl = selectCard("minion", name, cost, cardClass, cardSet, rule);

    if (attack != null) {
        requestUrl += "attack=" + attack + "&";
    }
    if (health != null) {
        requestUrl += "health=" + health + "&";
    }
    if (rarity != null) {
        requestUrl += "rarity=" + rarity + "&";
    }
    if (race != null) {
        requestUrl += "race=" +race + "&";
    }

    return request.get(checkEnd(requestUrl));
}

export function selectSpell(name, cost, cardClass, cardSet, rule, rarity, spellSchool) {
    let requestUrl = selectCard("spell", name, cost, cardClass, cardSet, rule);

    if(rarity != null) {
        requestUrl += "rarity=" + rarity + "&";
    }
    if(spellSchool != null) {
        requestUrl += "spellSchool=" + spellSchool + "&";
    }

    return request.get(checkEnd(requestUrl));
}

export function selectWeapon(name, cost, cardClass, cardSet, rule, attack, durability, rarity) {
    let requestUrl = selectCard("weapon", name, cost, cardClass, cardSet, rule);

    if(attack != null) {
        requestUrl += "attack=" + attack + "&";
    }
    if(durability != null) {
        requestUrl += "durability=" + durability + "&";
    }
    if(rarity != null) {
        requestUrl += "rarity=" + rarity + "&";
    }

    return request.get(checkEnd(requestUrl));
}

export function selectHero(name, cost, cardClass, cardSet, rule, armor, health, rarity) {
    let requestUrl = selectCard("hero", name, cost, cardClass, cardSet, rule);

    if(armor != null) {
        requestUrl += "armor=" + armor + "&";
    }
    if(health != null) {
        requestUrl += "health=" + health + "&";
    }
    if(rarity != null) {
        requestUrl += "rarity=" + rarity + "&";
    }

    return request.get(checkEnd(requestUrl));
}

export function selectLocation(name, cost, cardClass, cardSet, rule, health, rarity) {
    let requestUrl = selectCard("location", name, cost, cardClass, cardSet, rule);

    if(health != null) {
        requestUrl += "health=" + health + "&";
    }
    if(rarity != null) {
        requestUrl += "rarity=" + rarity + "&";
    }

    return request.get(checkEnd(requestUrl));
}

export function selectHeroPower(name, cost, cardClass, cardSet, rule) {
    let requestUrl = selectCard("heroPower", name, cost, cardClass, cardSet, rule);

    return request.get(checkEnd(requestUrl));
}

export function selectAll(name, cost, cardClass, cardSet, rule) {
    let requestUrl = selectCard("all", name, cost, cardClass, cardSet, rule);

    return request.get(checkEnd(requestUrl));
}

export function selectDefault() {
    let requestUrl = "/default";
    return request.get(requestUrl);
}

function selectCard(type, name, cost, cardClass, cardSet, rule) {
    let requestUrl = "/" + type + "?";
    if (name != null) {
        requestUrl += "name=" + name + "&";
    }
    if (cost != null) {
        requestUrl += "cost=" + cost + "&";
    }
    if (cardClass != null) {
        requestUrl += "cardClass=" + cardClass + "&";
    }
    if (cardSet != null) {
        requestUrl += "cardSet=" + cardSet + "&";
    }
    if (rule != null) {
        requestUrl += "rule=" + rule + "&";
    }

    return requestUrl;
}

function checkEnd(requestUrl) {
    if (requestUrl.endsWith("&")) {
        requestUrl = requestUrl.slice(0, -1);
    }
    return requestUrl;
}