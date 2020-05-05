let filters = {
    searchText: '',
    sortBy: 'byCreated'
}


const updateFilters = ({searchText, sortBy}) => {
    if(typeof searchText === 'string') {
        filters.searchText = searchText.toLowerCase()
    }
    if(typeof sortBy === 'string') {
        filters.sortBy = sortBy
    }
}

const getFilters = () => filters

export { updateFilters, getFilters }
