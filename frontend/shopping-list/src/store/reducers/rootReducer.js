import {
  TEST_START,
  TEST_SUCCESS,
  TEST_FAILURE,
  CHECKING_EMAIL,
  EMAIL_CHECKED,
  ADDING_GROUPS_TO_STATE,
  ADDING_GROUPS_TO_STATE_FAILED,
  ADDING_USER_TO_STATE,
  GETTING_ITEMS,
  GETTING_ITEMS_SUCCESS,
  GETTING_ITEMS_FAILED,
  FETCHING_SINGLE_GROUP,
  SINGLE_GROUP_FETCHED,
  CLEARING_CURRENT_GROUP,
  UPDATE_ITEM_PURCHASED_START,
  USER_ADDED_TO_STATE,
  PURCHASING_ITEM,
  ITEM_PURCHASED,
  USER_GROUPS_FETCHED,
  USER_PROFILE_FETCHED,
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
} from "../actions";

const initialState = {
  userId: null,
  name: null,
  email: null,
  profilePicture: null,
  currentGroup: null,
  groups: null,
  items: null,
  currentUser: null,
  emailChecked: false,
  groupUsers: null,
  groupUserProfiles: null,
  groupTotal: null,
  needsNewItems: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_START:
      return state;
    case TEST_SUCCESS:
      return state;
    case TEST_FAILURE:
      return state;

    case CHECKING_EMAIL:
      return state;

    case EMAIL_CHECKED:
      // console.log('emc payload', action.payload.id);
      localStorage.setItem('userId', action.payload.id);
      return {
        ...state,
        emailChecked: true,
        userId: action.payload.id
      }

    case ADDING_USER_TO_STATE:
      return state;

    case USER_ADDED_TO_STATE:
      return {
        ...state,
        currentUser: action.payload,
      }


    case ADDING_GROUPS_TO_STATE:
      return {
        ...state,
        groups: action.payload
      }
    case ADDING_GROUPS_TO_STATE_FAILED:
      return state;

    case ADD_ITEM_START:
      return {
        ...state,
        needsNewItems: false
      }

    case ADD_ITEM_SUCCESS:
      return{
        ...state,
        needsNewItems: true,
      }

    case GETTING_ITEMS:
      return {
        ...state,
        needsNewItems: false
      }

    case GETTING_ITEMS_SUCCESS:
      console.log('reducer items', action.payload);
      let groupTotal = 0;
      let items = action.payload;
      if(items){
          items.map(item => {
              return groupTotal += item.price;
          })
        }
      return { 
        ...state, 
        items: action.payload, 
        groupTotal: groupTotal,
        needsNewItems: false
      }

    case GETTING_ITEMS_FAILED:
      return { ...state, items: null, purchaseDone: false };

      // Purchasing Items
    case UPDATE_ITEM_PURCHASED_START:
      let itms = state.items.map(itm => {
        if (itm.id === action.payload) {
          itm.purchased = !itm.purchased
        }

        return itm;
      })
      return { ...state, items: itms}

    case FETCHING_SINGLE_GROUP:
      return {
        ...state,
      }

    case SINGLE_GROUP_FETCHED:
      return {
        ...state,
        currentGroup: action.payload,
      }

    case CLEARING_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: null,
      }

    case USER_GROUPS_FETCHED:
      return{
        ...state,
        groupUsers: action.payload,
      }

    case USER_PROFILE_FETCHED:
      let profileArray = [];
      profileArray.push(action.payload);
      return {
        ...state,
        groupUserProfiles: profileArray,
      }

    case PURCHASING_ITEM:
      return {
        ...state,
      }

    case ITEM_PURCHASED:
      return {
        ...state,
        needsNewItems: true,
      }

    default:
      return state;
  }
};