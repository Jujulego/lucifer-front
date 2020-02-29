import moment from 'moment';
import React, { useState } from 'react';
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

import { PName, PLvl } from 'data/permission';
import Token, { FullToken, TokenHolder } from 'data/token';
import { AppState } from 'store';
import { ip2int } from 'utils/ip';

import {
  Table, TableBody, TableRow, TableSortCell, TablePagination,
  TableToolbar, TableAction, TableFilterAction,
  TableProps
} from 'components/basics';

import RestrictedAccess from 'components/permissions/RestrictedAccess';

import NewTokenDialog from './NewTokenDialog';
import TokenFilterDialog from './TokenFilterDialog';

// Types
export type TokenTableProps = Omit<TableProps<Token>, 'data' | 'toolbar' | 'blacklist'> & {
  holder: TokenHolder,
  permission: PName,
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
    holder, permission,
    onRefresh, onAdd, onDelete,
    ...table
  } = props;

  // State
  const [newToken, setNewToken] = useState("");

  // Redux
  const currentToken = useSelector((state: AppState) => state.auth.tokenId!);

  // Handlers
  const handleAdd = onAdd && (async () => {
    const token = await onAdd();

    if (token) {
      setNewToken(token.token);
    }
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
        <RestrictedAccess name={permission} level={PLvl.UPDATE}>
          <TableAction when="some" tooltip="Supprimer" onActivate={handleDelete}>
            <DeleteIcon />
          </TableAction>
        </RestrictedAccess>
      ) }
      { handleAdd && (
        <RestrictedAccess name={permission} level={PLvl.UPDATE}>
          <TableAction when="nothing" tooltip="Générer" onClick={handleAdd}>
            <AddIcon />
          </TableAction>
          <NewTokenDialog
            token={newToken}
            open={!!newToken} onClose={() => setNewToken("")}
          />
        </RestrictedAccess>
      ) }
      <TableFilterAction dialog={TokenFilterDialog} />
      { onRefresh && (
        <TableAction tooltip="Rafraîchir" onClick={() => onRefresh()}>
          <RefreshIcon />
        </TableAction>
      ) }
    </TableToolbar>
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...table}
          data={holder.tokens}
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
