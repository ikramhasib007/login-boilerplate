import React, { useState } from 'react';
import Head from 'next/head';
import nc from 'next-connect';
import Router from 'next/router';
import getClient from 'apollo';
import { GET_TOKEN } from 'src/operations/token';
import { classNames } from 'src/utils';
import { getLoginSession } from 'libs/auth';

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatpassword] = useState('');
  const [err, setErr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ message: '', isError: false });

  function inputValidate(e) {
    const { name, value } = e.target;
    if(!value) return false;
    let error = err.slice();
    if(name === 'password') {
      if(value.length < 8) error.push('password');
      else error = error.filter(err => err !== name);
      setErr([...new Set(error)])
    } else if(name === 'repeatpassword') {
      if(value.length < 8 || value !== password) error.push('repeatpassword');
      else error = error.filter(err => err !== name);
      setErr([...new Set(error)])
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if(name === 'password') setPassword(value)
    else if(name === 'repeatpassword') setRepeatpassword(value)
    let error = err.slice();
    error = error.filter(err => err !== name);
    setErr(error)
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    if(err.length || !password || !repeatpassword) {
      let error = err.slice();
      if(!password) {
        error.push('password');
        setErr([...new Set(error)])
      } else if(!repeatpassword) {
        error.push('repeatpassword');
        setErr([...new Set(error)])
      }
      return false;
    }

    const body = {
      password: event.currentTarget.password.value,
      token,
    };

    setLoading(true)
    const res = await fetch('/api/user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setLoading(false)

    if (res.status === 200) Router.replace('/login');
  }

  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>

      <div className="mx-auto w-full max-w-sm lg:w-96">
        {/* {msg.message ? <p className={classNames(msg.isError ? "text-red-500" : 'text-green-500', "flex items-center justify-center text-sm text-center pt-9 -mb-14" )}>
          <span>{msg.message}</span>{' '}
          {!msg.isError && <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
        </p> : null} */}
        {valid ? <>
          <div className="pt-20 pb-4">
            <h2 className={"text-lg font-medium"}>Reset password</h2>
            <p className="text-sm">Enter your new password.</p>
          </div>
          <form noValidate onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-0.5">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New password"
                  value={password}
                  className={classNames('input', err.includes('password') ? 'invalid' : 'valid')}
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  onBlur={inputValidate}
                  aria-invalid={err.includes('password') ? true : undefined}
                  aria-describedby={err.includes('password') ? "password-error" : undefined}
                />
              </div>
              {err.includes('password') && <p className="h-0 text-sm text-red-600" id="password-error">
                Password must be 8 characters or longer.
              </p>}
            </div>

            <div className="space-y-0.5">
              <label htmlFor="repeatpassword" className="sr-only">
                Repeat Password
              </label>
              <div className="mt-1">
                <input
                  id="repeatpassword"
                  name="repeatpassword"
                  type="password"
                  placeholder="Repeat Password"
                  value={repeatpassword}
                  className={classNames('input', err.includes('repeatpassword') ? 'invalid' : 'valid')}
                  required
                  onChange={handleChange}
                  onBlur={inputValidate}
                  aria-invalid={err.includes('repeatpassword') ? true : undefined}
                  aria-describedby={err.includes('repeatpassword') ? "repeatpassword-error" : undefined}
                />
              </div>
              {err.includes('repeatpassword') && <p className="h-0 text-sm text-red-600" id="repeatpassword-error">
                Password does not match
              </p>}
            </div>
            <div>
              <button
                type="submit"
                className={classNames(
                  (loading) ? "cursor-wait" : "",
                  "btn btn-primary"
                )}
              >
                Set new password
              </button>
            </div>
          </form>
        </> : <>
          <div className="pt-20 pb-4 text-center">
            <h2 className="text-lg font-medium">Reset password</h2>
            <p className="text-sm">This link may have been expired</p>
          </div>
        </>}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const handler = nc();
  await handler.run(context.req, context.res);
  const { token } = context.query;
  const client = getClient()
  let valid = null;

  const session = await getLoginSession(context.req)
  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    let variables = { id: token, type: 'passwordReset' }
    const { data } = await client.query({query: GET_TOKEN, variables})
    if(new Date().valueOf() <= data.opsToken.expireAt) valid = true;
  } catch (error) {
    console.log('error: ', error);
  }

  return { props: { token, valid } };
}

export default ResetPasswordTokenPage;
