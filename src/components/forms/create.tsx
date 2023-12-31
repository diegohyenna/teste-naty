import styled from "@emotion/styled";
import { CircularProgress, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type FormProps = {
  useEffects?: {
    action: Function;
    dependencyArray?: Array<any>;
  };
  onSubmit: React.FormEventHandler;
  title: string;
  children: React.ReactNode;
  loading: boolean;
  setLoading: React.Dispatch<any>;
};

const FormContainer = styled.div`
  .Mui-disabled {
    background-color: #dbdbdb;
  }
`;

function FormCreate({
  useEffects,
  onSubmit,
  title,
  children,
  loading = false,
  setLoading,
}: FormProps) {
  const router = useRouter();

  useEffect(() => {
    if (!useEffects) setLoading(false);

    let dependencyArrayValidation = useEffects?.dependencyArray
      ? useEffects.dependencyArray?.map((items) => items != 0)
      : [];

    if (
      useEffects?.action &&
      useEffects?.dependencyArray?.length &&
      !dependencyArrayValidation?.includes(false)
    ) {
      useEffects
        ?.action()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [useEffects?.dependencyArray]);

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Divider sx={{ whiteSpace: "unset" }}>
              <Typography variant="h4">{title}</Typography>
            </Divider>
            {loading && (
              <Item>
                <CircularProgress />
              </Item>
            )}
          </Grid>

          {!loading && <>{children}</>}

          <Grid container item spacing={1} xs={12}>
            <Grid item>
              <Item>
                <Button type="submit" variant="contained" color="success">
                  Salvar
                </Button>
              </Item>
            </Grid>
            <Grid item>
              <Item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => router.back()}
                >
                  Voltar
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
}

export default FormCreate;
