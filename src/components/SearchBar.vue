<template>

    <div class="search-bar">

<!--        name-->
        <div class="form-group">
            <label>名称: </label>
            <input type="text" placeholder="如：暗影收割者安度因" v-model="searchInfo.name" />
        </div>


<!--        rule-->
        <div class="form-group">
            <label>描述: </label>
            <input type="text" placeholder="如：发现" v-model="searchInfo.rule"/>
        </div>


<!--        cost-->
        <div class="form-group">
            <label>费用: </label>
            <select v-model="searchInfo.cost">
                <option v-for="(value, text) in costMapping" :key="value" :value="value">{{ text }}</option>
            </select>
        </div>

<!--        cardClass-->
        <div class="form-group">
            <label>职业: </label>
            <select v-model="searchInfo.cardClass">
                <option v-for="(value, text) in cardClassMapping" :key="value" :value="value">{{ text }}</option>
            </select>
        </div>

<!--        cardSet-->
        <div class="form-group">
            <label>版本: </label>
            <select v-model="searchInfo.cardSet">
                <option v-for="(value, text) in cardSetMapping" :key="value" :value="value">{{ text }}</option>
            </select>
        </div>

<!--        type-->
        <div class="form-group">
            <label>类型: </label>
            <select v-model="searchInfo.searchType" @change="clear">
                <option v-for="(value, text) in type" :key="value" :value="value">{{ text }}</option>
            </select>
        </div>

        <button @click="select">Search!</button>

        <div class="type-search">
<!--        随从-->
            <div v-show="searchInfo.searchType === 'minion'">
                <!-- 随从相关的下拉菜单或输入框 -->
                <div class="form-group2">
                    <label>攻击力:</label>
                    <select v-model="searchInfo.attack">
                        <option v-for="(value, text) in attack" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>生命值: </label>
                    <select v-model="searchInfo.health">
                        <option v-for="(value, text) in health" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>种族: </label>
                    <select v-model="searchInfo.race">
                        <option v-for="(value, text) in race" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>稀有度: </label>
                    <select v-model="searchInfo.rarity">
                        <option v-for="(value, text) in rarity" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>
            </div>

    <!--        法术-->
            <div v-show="searchInfo.searchType === 'spell'">
                <div class="form-group2">
                    <label>派系: </label>
                    <select v-model="searchInfo.spellSchool">
                        <option v-for="(value, text) in spellSchool" v-bind:key="value" v-bind:value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>稀有度: </label>
                    <select v-model="searchInfo.rarity">
                        <option v-for="(value, text) in rarity" v-bind:key="value" v-bind:value="value">{{ text }}</option>
                    </select>
                </div>
            </div>

    <!--        武器-->
            <div v-show="searchInfo.searchType === 'weapon'">
                <div class="form-group2">
                    <label>攻击力: </label>
                    <select v-model="searchInfo.attack">
                        <option v-for="(value, text) in attack" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>耐久度: </label>
                    <select v-model="searchInfo.durability">
                        <option v-for="(value, text) in durability" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>稀有度: </label>
                    <select v-model="searchInfo.rarity">
                        <option v-for="(value, text) in rarity" v-bind:key="value" v-bind:value="value">{{ text }}</option>
                    </select>
                </div>
            </div>

    <!--        英雄牌-->
            <div v-show="searchInfo.searchType === 'hero'">
                <div class="form-group2">
                    <label>护甲: </label>
                    <select v-model="searchInfo.armor">
                        <option v-for="(value, text) in armor" v-bind:key="value" v-bind:value="value">{{ text }}</option>
                    </select>
                </div>
            </div>

    <!--        地标-->
            <div v-show="searchInfo.searchType === 'location'">
                <div class="form-group2">
                    <label>耐久度: </label>
                    <select v-model="searchInfo.health">
                        <option v-for="(value, text) in health" :key="value" :value="value">{{ text }}</option>
                    </select>
                </div>

                <div class="form-group2">
                    <label>稀有度: </label>
                    <select v-model="searchInfo.rarity">
                        <option v-for="(value, text) in rarity" v-bind:key="value" v-bind:value="value">{{ text }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="image-list">
        <div v-for="result in searchResult" :key="result.id" class="image-item">
            <img :src="`https://art.hearthstonejson.com/v1/render/latest/zhCN/256x/${result.id}.png`"
                 :alt="result.name" loading="lazy"
                 @mouseenter="showOverlay(result.id)"
                 @mouseleave="hideOverlay(result.id)">
            <div class="overlay" :class="{ 'visible': visibleOverlayId === result.id }">
                <div class="name">{{ result['name']}} </div>
                <div class="card_set">{{ findClassSetByNumber(result['cardSet']) }}</div>
                <div class="flavor">{{ result['flavor'] }}</div>

            </div>
        </div>
    </div>
</template>

<script setup>
    // export default {
    //     name: 'SearchBar',
    // }
    import {ref} from 'vue';
    import {cardClassMapping as ccm, costMapping as cm, cardSetMapping as stm, type as t, attack as atk,
        health as hlt, rarity as rt, race as rc, spellSchool as ss, durability as d, armor as a} from "../utils/mapping";
    import {selectMinion, selectSpell, selectWeapon, selectHero, selectLocation, selectHeroPower, selectAll} from "../api/card_service";


    const cardClassMapping = ccm;
    const costMapping = cm;
    const cardSetMapping = stm;
    const type = t;
    const attack = atk;
    const health = hlt;
    const rarity = rt;
    const race = rc;
    const spellSchool = ss;
    const durability = d;
    const armor = a;

    const searchInfo = ref({
        name: null,
        cost: null,
        cardClass: null,
        cardSet: null,
        rule: null,

        rarity: null,
        attack: null,
        health: null,
        race: null,
        spellSchool: null,
        durability: null,
        armor: null,

        searchType: null
    });

    function clear() {
        const target = ["rarity", "attack", "health", "race", "spellSchool", "durability", "armor"];
        for(const key in searchInfo.value) {
            if (target.includes(key)) {
                searchInfo.value[key] = null;
            }
        }
    }

    async function select() {
        const value = searchInfo.value;

        if (value.searchType == null) {
            searchResult.value = await selectAll(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule)
        }
        else if (value.searchType === "minion") {
            searchResult.value = await selectMinion(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule, value.attack, value.health, value.rarity, value.race);
        }
        else if (value.searchType === "spell") {
            searchResult.value = await selectSpell(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule, value.rarity, value.spellSchool);
        }
        else if (value.searchType === "weapon") {
            searchResult.value = await selectWeapon(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule, value.attack, value.durability, value.rarity);
        }
        else if (value.searchType === "hero") {
            searchResult.value = await selectHero(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule, value.armor, value.health, value.rarity);
        }
        else if (value.searchType === "location") {
            searchResult.value = await selectLocation(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule, value.health, value.rarity);
        }
        else if (value.searchType === "heroPower") {
            searchResult.value = await selectHeroPower(value.name, value.cost, value.cardClass, value.cardSet,
                value.rule)
        }
    }

    const searchResult = ref([]);

    const visibleOverlayId = ref(null);

    // 绑定两个函数，把showOverlay绑定到mouseover方法，鼠标悬停时触发
    const showOverlay = (id) => {
        visibleOverlayId.value = id;
    };
    // hideOverlay绑定到mouseleave方法，鼠标离开时触发
    const hideOverlay = (id) => {
        if (visibleOverlayId.value === id) {
            visibleOverlayId.value = null;
        }
    };

    const showKeys = ['name', 'rule', 'flavor'];

    function findClassSetByNumber(number) {
        for ( const key in cardSetMapping) {
            if (number === cardSetMapping[key]) {
                return key;
            }
        }
        return null; // 如果没有找到对应的值，返回 null
    }

</script>

<style scoped>
    .search-bar {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: url('@/assets/search-bar.png') no-repeat center center;
        background-size: 100% 100%;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }

    .type-search {
        display: inline-block;
        width: 100%;
    }

    .form-group2 {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 一行五列 */
    }

    button {
        width: 12%;
    }

    button:hover {
        width: 12%;
        font-weight: bold;
    }

    label {
        font-weight: bold;
        color: #FFE4E1;
    }

    input[type="text"],
    select {
        flex: 1;
        padding: 5px;
        font-size: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        transition: border-color 0.3s, box-shadow 0.3s;
        background-color: rgba(255, 255, 255, 0.8);
    }

    input[type="text"]:focus,
    select:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }


    input[type="text"]::placeholder {
        color: #999;
    }

    option {
        padding: 10px;
    }

    .image-list {
        width: 80%;
        max-width: 1000px;
        margin: 20px auto;
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 一行五列 */
        gap: 20px;
        background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
        padding: 20px;
        border-radius: 8px;
    }

    .image-item {
        box-sizing: border-box;
        /*background-color: rgba(255, 255, 255, 0.1);*/
        border-radius: 8px;
        overflow: hidden;
        position: relative;
    }

    .image-item img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        display: block; /* 移除行内元素带来的空隙 */
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        /*justify-content: center;*/
        transform: translateY(-100%);  /* 一开始将信息框设置在图片最上方 */
        transition: transform 0.5s ease-in-out; /* 移动的时间为0.3秒， ease-in-out 设定移动时开始和结束较慢，中间快 */
    }

    .overlay.visible {
        transform: translateY(0); /* 可见时移动到完全覆盖图片 */
    }

    .name {
    font-family: "PingFang";
    }

    .card_set {
        margin-top: 15px;
        font-size: 15px;
        font-family: "Hua Wen Kai Ti";
    }

    .flavor {
        opacity: 0.8; /* 设置透明度为 80% */
        font-style: italic; /* 设置斜体 */
        font-size: 12px;
        margin-top: 20px;
    }
</style>
