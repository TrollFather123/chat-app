import { loginUser } from "@/api/functions";
import { ILoginData } from "@/interface/common.all";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, styled, Grid, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

const AuthWrapper = styled(Box)`
  padding: 100px 0 100px;
  height: 100vh;
`;

const userLoginSchema = yup.object().shape({
  email: yup.string().trim().required("Emial is required"),
  password: yup.string().trim().required("Password is required"),
});

const Index = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
  });
  const formSubmit = (data: ILoginData) => {
    loginMutate(data, {
      onSuccess: (successData) => {

        console.log(successData,"successData")
        if (successData?.status === 200) {
          setCookie(null, "token", successData.token, {
            path: "/",
          });
          setCookie(null, "user_id", successData.data?._id, {
            path: "/",
          });

          router.push("/chat");
        }
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };
  return (
    <AuthWrapper>
      <Container fixed>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Email"
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { ...props },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    placeholder="Enter Password"
                    {...props}
                    helperText={error?.message}
                    error={invalid}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </AuthWrapper>
  );
};

export default Index;
