import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOfferedItems } from "../actions/offereditem-actions";

const TypeAhead = ({ setIsOpen }) => {
  const allOfferedItems = useSelector((state) => state.offered.items);
  const dispatch = useDispatch();

  // const currentFilter = data.filter;

  React.useEffect(() => {
    if (allOfferedItems === undefined) {
      dispatch(getAllOfferedItems());
    }
  }, [dispatch, allOfferedItems]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const searchRef = useRef(null);

  React.useEffect(() => {
    if (allOfferedItems !== undefined) {
      searchRef.current.focus();
    }
  }, [allOfferedItems]);
  let matchedItemsArray = [];
  let resultsFound = true;

  if (allOfferedItems !== undefined) {
    matchedItemsArray = allOfferedItems.filter((item) => {
      let LowerCaseSearch = searchTerm.toLowerCase();
      let itemLowerCaseName = item.name.toLowerCase();
      if (
        searchTerm !== "" &&
        searchTerm.length >= 2 &&
        itemLowerCaseName.includes(LowerCaseSearch)
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (matchedItemsArray.length === 0 && searchTerm.length >= 2) {
      resultsFound = false;
    }
  }

  if (!allOfferedItems) {
    return <div></div>;
  }

  return (
    <Wrapper onClick={() => setIsOpen(false)}>
      <InnerWrapper onClick={(ev) => ev.stopPropagation()}>
        <Input
          ref={searchRef}
          value={searchTerm}
          onChange={(ev) => {
            ev.stopPropagation();
            setSearchTerm(ev.target.value);
          }}
        />
        {resultsFound === false ? (
          <DropDown>
            <SearchResult>No search results found</SearchResult>
          </DropDown>
        ) : null}
        {matchedItemsArray.length > 1 && (
          <DropDown>
            {matchedItemsArray.map((item, index) => {
              let lowerCaseItemName = item.name.toLowerCase();
              let lowerCaseSearchTerm = searchTerm.toLowerCase();
              let indexOfSearch = lowerCaseItemName.indexOf(
                lowerCaseSearchTerm
              );
              let indexToSlice = indexOfSearch;
              let firstSlice = item.name.slice(0, indexToSlice);
              let secondSlice = item.name.slice(indexToSlice);

              return (
                <SearchResult key={item._id + index}>
                  <ItemsPrediction
                    to={`/items/${item._id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FirstSlice>
                      {`${firstSlice}`}
                      <Prediction>{`${secondSlice}`}</Prediction>
                    </FirstSlice>
                  </ItemsPrediction>
                </SearchResult>
              );
            })}
          </DropDown>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};
export default TypeAhead;

const Wrapper = styled.div`
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 400;
  display: flex;
  top: -300px;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
`;

const InnerWrapper = styled.div`
  background: white;
  z-index: 400;
  width: 85%;
  border-radius: 5px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  border: 1px solid black;
  height: 30px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const DropDown = styled.ul`
  width: 70%;
  background-color: white;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  text-align: center;
  text-decoration: none;
  max-height: 300px;
  overflow: scroll;
`;

const SearchResult = styled.li`
  background: white;
  margin-bottom: 10px;
`;

const Prediction = styled.span`
  font-weight: 700;
  background: white;
`;

const ItemsPrediction = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1em;
`;

const FirstSlice = styled.span`
  background: white;
`;
