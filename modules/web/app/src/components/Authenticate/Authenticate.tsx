/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  Button,
  TextField,
  withStyles,
  WithStyles
} from "@material-ui/core"
import * as React from "react"
import {
  branch,
  compose,
  pure,
  renderComponent
} from "recompose"

import {
  AuthenticateRequestWithCredentials as AuthenticateRequest,
  Session
} from "common"
import {
  WithForm,
  withForm,
} from "enhancers"

import { Styles, styles } from "./Authenticate.styles"
import { AuthenticateSuccess } from "./AuthenticateSuccess"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Authentication render properties
 */
export type AuthenticateRenderProps =
  & WithStyles<Styles>
  & WithForm<AuthenticateRequest, Session<string>>

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Authentication render component
 *
 * @param props - Properties
 *
 * @return JSX element
 */
export const AuthenticateRender: React.SFC<AuthenticateRenderProps> =
  ({ classes, form, request, handleChange, handleSubmit }) =>
    <form method="post" onSubmit={handleSubmit}>
      <TextField name="username" type="text" disabled={form.pending}
        label="Email" value={request.username} onChange={handleChange}
        autoComplete="username" fullWidth={true} margin="dense"
      />
      <TextField name="password" type="password" disabled={form.pending}
        label="Password" value={request.password} onChange={handleChange}
        autoComplete="new-password" fullWidth={true} margin="dense"
      />
      <Button type="submit" variant="contained" disabled={form.pending}
        color="primary" fullWidth={true}
      >
        Sign in
      </Button>
    </form>

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * Authentication component
 */
export const Authenticate =
  compose<AuthenticateRenderProps, {}>(
    withStyles(styles),
    withForm<AuthenticateRequest, Session<string>>({
      username: "",
      password: ""
    }),
    branch<AuthenticateRenderProps>(
      ({ form }) => form.success,
      renderComponent(AuthenticateSuccess)
    ),
    pure
  )(AuthenticateRender)
