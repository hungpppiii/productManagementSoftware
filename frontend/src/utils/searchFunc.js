export const handleSelectTypeSearchFunc = (
  e,
  setFilterData,
  data,
  setTypeSearch
) => {
  if (e.target.value === "all") {
    setFilterData(data);
  }
  setTypeSearch(e.target.value);
};

export const handleSearchFunc = (input, data, setFilterData, typeSearch) => {
  if (typeSearch === "all") {
    setFilterData(data);
    return;
  }
  if (input) {
    const query = input.value.toUpperCase();
    const newFilterGuaranteeProducts = data.filter((e) =>
      e[typeSearch].toUpperCase().includes(query)
    );
    setFilterData(newFilterGuaranteeProducts);
  }
};
