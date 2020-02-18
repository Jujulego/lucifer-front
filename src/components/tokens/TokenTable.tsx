import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Token from 'data/token';
import { AppState } from 'store';
import { ip2int } from 'utils/ip';

import {
  Table, TableBody, TableRow, TableSortCell, TablePagination,
  TableToolbar, TableSelectedAction,
  TableProps
} from 'components/basics';

// Types
export type TokenTableProps = Omit<TableProps<Token>, 'toolbar' | 'blacklist'> & {
  onDelete?: (id: Token['_id']) => void
};

// Component
const TokenTable = (props: TokenTableProps) => {
  // Props
  const { onDelete, ...table } = props;

  // Redux
  const currentToken = useSelector((state: AppState) => state.auth.tokenId!);

  // Handlers
  const handleDelete = onDelete && ((tokens: Token[]) => {
    tokens.forEach(token => onDelete(token._id));
  });

  // Render
  const ip = (token: Token) => ip2int(token.from);

  const toolbar = (
    <TableToolbar title="Tokens">
      { handleDelete && (
        <TableSelectedAction tooltip="Supprimer" onActivate={handleDelete}>
          <DeleteIcon />
        </TableSelectedAction>
      ) }
    </TableToolbar>
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...table}
          blacklist={[currentToken]}
          toolbar={toolbar}
          pagination={<TablePagination component="div" rowsPerPageOptions={[5, 10, 20]} />}
        >
          <TableHead>
            <TableRow>
              <TableSortCell field={ip}>Adresse</TableSortCell>
              <TableSortCell<Token> field="createdAt">Date</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (token: Token) => (
              <TableRow key={token._id} doc={token}>
                <TableCell>{ token.from }</TableCell>
                <TableCell>{ moment.utc(token.createdAt).local().format('LLLL') }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
};

export default TokenTable;