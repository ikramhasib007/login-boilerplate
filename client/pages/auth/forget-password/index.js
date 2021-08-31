import React, { useState } from 'react';
import Head from 'next/head';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { classNames, isEmail } from 'src/utils';
import { getLoginSession } from 'libs/auth';

const ForgetPasswordPage = () => {
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState({ message: '', isError: false });
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault(e);

    const body = {
      email: e.currentTarget.email.value,
    };

    if(!body.email || !isEmail(body.email)) {
      setErr('email')
      return false;
    }

    setLoading(true)
    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setLoading(false)

    if (res.status === 200) {
      setMsg({ message: 'An email has been sent to your mailbox' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      
      <div className="mx-auto w-full max-w-sm lg:w-96">
        {msg.message ? <p className={classNames(msg.isError ? "text-red-500" : 'text-green-500', "flex items-center justify-center text-sm text-center pt-9 -mb-14" )}>
          <span>{msg.message}</span>{' '}
          {!msg.isError && <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
        </p> : null}
        <div className="pt-20 pb-4">
          <h2 className="text-lg font-medium">Forget password</h2>
          <p className="text-sm">Do not worry. Simply enter your email address below.</p>
        </div>
        <form noValidate onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-0.5">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                onChange={() => setErr('')}
                placeholder="Email address"
                className={classNames('input', err.includes('email') ? 'invalid' : 'valid')}
                autoComplete="email"
                required
                aria-invalid={err.includes('email') ? true : undefined}
                aria-describedby={err.includes('email') ? "email-error" : undefined}
              />
              {err.includes('email') && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>}
            </div>
            {err.includes('email') && <p className="h-0 text-sm text-red-600" id="email-error">
              Enter a valid email address
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getLoginSession(context.req)
  
  if(session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: null,
      token: ''
    },
  }
}

export default ForgetPasswordPage;