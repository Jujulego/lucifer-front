import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container, FormControl, InputLabel,
  MenuItem, Select
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateConfig } from '../../models/config';
import { useDaemonConfigAPI } from '../../config.hooks';

// Styles
const useStyles = makeStyles(({ spacing }) => ({
  root: {
    paddingTop: spacing(4)
  },
  wrapper: {
    position: 'relative',
    marginLeft: 'auto',
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  }
}));

// Types
export interface AddConfigProps {
  daemonId: string;
  onCreate: (data: CreateConfig) => Promise<any>
}

// Component
const AddConfig = (props: AddConfigProps) => {
  const { daemonId, onCreate } = props;

  // API
  const { data: types } = useDaemonConfigAPI.types(daemonId);

  // Form
  const { errors, control, handleSubmit, formState } = useForm<CreateConfig>({
    mode: 'onChange'
  });

  // Render
  const styles = useStyles();

  return (
    <Container className={styles.root} maxWidth="xs">
      <Card
        elevation={4}
        component='form' onSubmit={handleSubmit(onCreate)}
      >
        <CardHeader title="Créer une configuration" />
        <CardContent>
          <FormControl
            variant="outlined" fullWidth
            error={!!errors.type}
          >
            <InputLabel id="new-config-type">Type</InputLabel>
            <Controller
              name="type"
              control={control} as={Select}
              rules={{ required: true }}
              label="Type" labelId="new-config-type"
            >
              { types?.map((type) => (
                <MenuItem key={type} value={type}>
                  { type }
                </MenuItem>
              )) }
            </Controller>
          </FormControl>
        </CardContent>
        <CardActions>
          <div className={styles.wrapper}>
            <Button
              color="primary"
              disabled={!formState.isValid || formState.isSubmitting}
              type="submit"
            >
              Créer
            </Button>
            { formState.isSubmitting && (
              <CircularProgress className={styles.progress} size={24} />
            ) }
          </div>
        </CardActions>
      </Card>
    </Container>
  );
};

export default AddConfig;
