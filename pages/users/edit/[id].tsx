import FormCreate from "@/src/components/forms/create";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { User } from "@/src/core/domain/entities/user";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

function Edit() {
  const router = useRouter();

  const { handleOpenAlert, userUseCases } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const id = router.query?.id ? +router.query.id : 0;

  const [loading, setLoading] = useState(true);

  const getUserById = () => {
    return userUseCases.useCaseGet
      .execute(id)
      .then(async (res) => {
        setLoading(true);
        const user: any = await res.toJSON();

        for (let prop in user) {
          setValue(prop, user[prop]);
        }

        return Promise.resolve(true);
      })
      .catch((res) => {
        router.push("/users").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
          return Promise.reject();
        });
      });
  };

  const onSubmit = (data: any) => {
    const obj = new User(data);

    return userUseCases.useCaseUpdate
      .execute(id, obj)
      .then((res) => {
        router.push("/users").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Sucesso!",
            status: "success",
          });
        });
      })
      .catch((res) => {
        router.push("/users").then(() => {
          handleOpenAlert({
            open: true,
            message: res?.message || "Houve algum erro",
            status: "error",
          });
        });
      });
  };

  return (
    <FormCreate
      title="Atualizar o usuário"
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      setLoading={setLoading}
      useEffects={{ action: getUserById, dependencyArray: [id, loading] }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          margin="dense"
          id="nome"
          label="Nome"
          type="text"
          fullWidth
          title="Informe o nome do usuario"
          error={errors.nome ? true : false}
          helperText={errors.nome ? (errors.nome.message as string) : ""}
          {...register("nome", {
            required: {
              value: true,
              message: "Digite o nome",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="logradouro"
          label="Logradouro"
          type="text"
          fullWidth
          title="Informe o logradouro do endereço"
          error={errors.logradouro ? true : false}
          helperText={
            errors.logradouro ? (errors.logradouro.message as string) : ""
          }
          {...register("logradouro", {
            required: {
              value: true,
              message: "Digite o logradouro do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="numero"
          label="Número"
          type="text"
          fullWidth
          title="Informe o numero do endereço"
          error={errors.numero ? true : false}
          helperText={errors.numero ? (errors.numero.message as string) : ""}
          {...register("numero", {
            required: {
              value: true,
              message: "Digite o número do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          margin="dense"
          id="bairro"
          label="Bairro"
          type="text"
          fullWidth
          title="Informe o bairro do endereço"
          error={errors.bairro ? true : false}
          helperText={errors.bairro ? (errors.bairro.message as string) : ""}
          {...register("bairro", {
            required: {
              value: true,
              message: "Digite o bairro do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          margin="dense"
          id="cidade"
          label="Cidade"
          type="text"
          fullWidth
          title="Informe a cidade do endereço"
          error={errors.cidade ? true : false}
          helperText={errors.cidade ? (errors.cidade.message as string) : ""}
          {...register("cidade", {
            required: {
              value: true,
              message: "Digite a cidade do endereço",
            },
          })}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          margin="dense"
          id="uf"
          label="Estado"
          type="text"
          fullWidth
          title="Informe o estado do endereço"
          error={errors.uf ? true : false}
          helperText={errors.uf ? (errors.uf.message as string) : ""}
          {...register("uf", {
            required: {
              value: true,
              message: "Digite o estado do endereço",
            },
          })}
        />
      </Grid>
    </FormCreate>
  );
}

export default Edit;
