import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'store';
import { getAllUsers } from 'store/users/thunks';

import UsersTable, { UsersTableProps } from 'components/users/UsersTable';

// Type
type DefinedProps = 'data' | 'onLoad';
export type AllUsersTableProps = Omit<UsersTableProps, DefinedProps>;

// Component
function mapStateToProps(state: AppState, _: AllUsersTableProps) {
  const { users } = state.users.list;

  return {
    data: users || []
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, any>, _: AllUsersTableProps) {
  return {
    onLoad: () => dispatch(getAllUsers()),
  };
}

const AllUsersTable = connect(mapStateToProps, mapDispatchToProps)(UsersTable);

export default AllUsersTable;