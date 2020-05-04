let filters = {
    searchText: '',
    sortBy: 'byCreated'
}


const updateFilters = ({searchText, sortBy}) => {
    if(typeof searchText === 'string') {
        filters.searchText = searchText
    }
    if(typeof sortBy === 'string') {
        filters.sortyBy = sortBy
    }
}

const getFilters = () => filters

export { updateFilters, getFilters }
