import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllOfferedItems } from "../actions/offereditem-actions";
import { getAllWantedItems } from "../actions/wanteditem-actions";
import { searchTermAction } from "../actions/search-actions";

const TypeAhead = () => {
  const allOfferedItems = useSelector((state) => state.offered.items);
  const allWantedItems = useSelector((state) => state.wanted.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (allOfferedItems === undefined) {
      dispatch(getAllOfferedItems());
    }
    if (allWantedItems === undefined) {
      dispatch(getAllWantedItems());
    }
  }, [dispatch, allOfferedItems]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const searchRef = useRef(null);

  React.useEffect(() => {
    if (allOfferedItems !== undefined && allWantedItems !== undefined) {
      searchRef.current.focus();
    }
  }, [allOfferedItems, allWantedItems]);
  let matchedItemsArray = [];
  let resultsFound = true;

  //convert All Offered Items object and All Wanted Items object to arrays and save them in allItems
  Object.entries(allOfferedItems);
  Object.entries(allWantedItems);
  const allItems = [...allOfferedItems, ...allWantedItems];

  if (allItems !== undefined) {
    matchedItemsArray = allItems.filter((item) => {
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

  if (!allItems) {
    return <div></div>;
  }
  console.log(matchedItemsArray);
  return (
    <Wrapper>
      <InnerWrapper onClick={(ev) => ev.stopPropagation()}>
        <Input
          ref={searchRef}
          value={searchTerm}
          placeholder="Search for Items/Services"
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
        {matchedItemsArray.length >= 1 && (
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
                    onClick={() => dispatch(searchTermAction(item.name))}
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
  /* height: 80px; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  position: absolute;
  z-index: 1;
  display: flex;
  /* transform: translate(45vw, -30vh); */
  justify-content: center;
  align-items: center;
  margin: 0;
  left: 400px;
  width: 50%;
`;

const InnerWrapper = styled.div`
  background: none;
  z-index: 1;
  width: 60%;
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
  width: 50%;
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
  list-style-type: none;
`;

const Prediction = styled.span`
  font-weight: 700;
  background: white;
`;

const ItemsPrediction = styled.div`
  text-decoration: none;
  color: black;
  font-size: 1em;
`;

const FirstSlice = styled.span`
  background: white;
`;
