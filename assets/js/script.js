function isJson(str)
{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function loadData() {
    return localStorage.getItem('page-data');
}

function getData() {
    let data = loadData();

    if (data === null) {
        fetchData();
    }

    data = loadData();

    if (!data || !isJson(data)) {
        console.log('No data')
        return [];
    }

    return JSON.parse(data)
}

function fetchData() {
    console.log('Fetching data');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('page-data', JSON.stringify(data))
        })
        .catch(error => {
            throw error
        })

    console.log('Loaded data')
}

function generateTopicItems(topicItems) {
    if (!topicItems || !topicItems.length) {
        return;
    }

    let items = []

    let linkTemplate = `
        <div class="btn btn-link">
            <a href="##HREF##" target="##TARGET##" class="##CLASS##" >##LABEL##</a>
        </div>
    `

    let listItemTemplate = `
        <li class="list-group-item mb-3">
            <div class="row">
                <div class="col-4">
                    <h5 class="pt-2 mb-0">##TITLE##</h5>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-between">
                        ##LINKS##
                    </div>
                </div>
            </div>
        </li>
    `

    topicItems.forEach(item => {
        let links = ''

        item?.links?.forEach(link => {
            links += linkTemplate
                .replaceAll('##LABEL##', link?.label ?? '')
                .replaceAll('##HREF##', link?.href ?? '')
                .replaceAll('##TARGET##', link?.target ?? '')
                .replaceAll('##CLASS##', link?.class ?? '')
        })

        let listItem = listItemTemplate
            .replaceAll('##TITLE##', item.title)
            .replaceAll('##LINKS##', links)

        items.push(listItem)
    })

    return items?.join('\n')
}

function appendTopicToAnchorMenu(id, title) {
    let topicMenuContainer = document.querySelector('[data-type="topic-menu-container"]');

    if (!topicMenuContainer) {
        console.log('No topicMenuContainer')
        return;
    }

    let topicMenuItem = document.createElement('li')
    topicMenuItem.innerHTML = `<a href="#${id}">${title}</a>`

    topicMenuContainer.append(topicMenuItem)
}

function generateTopic(topic) {
    let topicContainer = document.querySelector('[data-type="topic-container"]');

    if (!topicContainer) {
        console.log('No topicContainer')
        return;
    }

    let topicItems = generateTopicItems(topic?.items)
    let topicContent =  `
        <h5 class="pt-2 mb-0">
            <a href="#${topic.id}" name="${topic.id}">${topic.title}</a>
        </h5>

        <ul class="list-group list-group-flush px-4">
            ${topicItems}
        </ul>
    `
    let topicListItem = document.createElement('li')
    topicListItem.classList.add('list-group-item', 'mb-3')
    topicListItem.innerHTML = topicContent

    appendTopicToAnchorMenu(topic.id, topic.title)
    topicContainer.append(topicListItem)
}

function generateTopics(forceReload = false) {
    if (forceReload) {
        fetchData();
    }

    let data = getData();
    if (!data) {
        console.log('1')
        fetchData();
        console.log(data)
    }

    if (!data || !data?.topics?.length) {
        console.log('2', data)
        return;
    }

    document.querySelector('[data-type="topic-menu-container"]').innerHTML = ''

    data?.topics.forEach(topic => generateTopic(topic));
}

document.addEventListener('DOMContentLoaded', (event) => {
    generateTopics(true);
});
