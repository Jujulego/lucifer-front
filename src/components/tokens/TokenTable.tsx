import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  Chip,
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import Token, { FullToken } from 'data/token';
import { AppState } from 'store';
import { ip2int } from 'utils/ip';

import {
  Table, TableBody, TableRow, TableSortCell, TablePagination,
  TableToolbar, ToolbarAction, TableSelectedAction, TableFilterAction,
  TableProps
} from 'components/basics';

import TokenFilterDialog from './TokenFilterDialog';

// Types
export type TokenTableProps = Omit<TableProps<Token>, 'toolbar' | 'blacklist'> & {
  onRefresh?: () => void,
  onAdd?: () => Promise<FullToken | null>;
  onDelete?: (id: Token['_id']) => void
};

// Styles
const useStyles = makeStyles({
  chipCell: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});

// Component
const TokenTable = (props: TokenTableProps) => {
  // Props
  const {
    onRefresh, onAdd, onDelete,
    ...table
  } = props;

  // Redux
  const currentToken = useSelector((state: AppState) => state.auth.tokenId!);

  // Handlers
  const handleAdd = onAdd && (async () => {
    const token = await onAdd();
    console.log(token);
  });

  const handleDelete = onDelete && ((tokens: Token[]) => {
    tokens.forEach(token => onDelete(token._id));
  });

  // Render
  const styles = useStyles();

  const ip = (token: Token) => ip2int(token.from);
  const date = (token: Token) => moment.utc(token.createdAt);

  const toolbar = (
    <TableToolbar title="Tokens">
      { handleDelete && (
        <TableSelectedAction tooltip="Supprimer" onActivate={handleDelete}>
          <DeleteIcon />
        </TableSelectedAction>
      ) }
      { handleAdd && (
        <ToolbarAction tooltip="Générer" onClick={handleAdd}>
          <AddIcon />
        </ToolbarAction>
      ) }
      <TableFilterAction dialog={TokenFilterDialog} />
      { onRefresh && (
        <ToolbarAction tooltip="Rafraîchir" onClick={() => onRefresh()}>
          <RefreshIcon />
        </ToolbarAction>
      ) }
    </TableToolbar>
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...table}
          blacklist={[currentToken]}
          toolbar={toolbar}
          pagination={
            <TablePagination component="div" rowsPerPageOptions={[5, 10, 20]} />
          }
        >
          <TableHead>
            <TableRow>
              <TableSortCell field={ip}>Adresse</TableSortCell>
              <TableSortCell field={date}>Date</TableSortCell>
              <TableCell>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (token: Token) => (
              <TableRow key={token._id} doc={token}>
                <TableCell>{ token.from }</TableCell>
                <TableCell>{ date(token).local().format('LLLL') }</TableCell>
                <TableCell classes={{ root: styles.chipCell }}>
                  { token.tags.map((tag, i) => (
                    <Chip
                      key={i} label={tag}
                      color="secondary" size="small" variant="outlined"
                    />
                  )) }
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
};

export default TokenTable;