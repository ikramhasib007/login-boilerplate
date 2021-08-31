import React from 'react';
import Head from 'next/head';
import nc from 'next-connect';
import getClient from 'apollo';
import { getLoginSession } from 'libs/auth';
import { DELETE_TOKEN, GET_TOKEN } from 'src/operations/token';
import { EMAIL_VERIFY } from 'src/operations/user';

function EmailVerifyPage({ success }) {
  return (
    <>
      <Head>
        <title>Email verification - CAG Inc.</title>
      </Head>
      
      <div className="pt-20 pb-4 text-center">
        { success ? <>
          <p className="text-lg font-medium">Thank you for verifying your email address</p>
          <p className="text-sm">You may close this page.</p>
        </> :
        <p className="text-sm">This link may have been expired.</p>}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const handler = nc();
  await handler.run(context.req, context.res);
  const { token } = context.query;

  const session = await getLoginSession(context.req)
  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const client = getClient(session.token)

  try {
    let variables = { id: token, type: 'emailVerify' }
    const { data } = await client.query({query: GET_TOKEN, variables})
    if(new Date().valueOf() <= data.opsToken.expireAt) {
      await client.mutate({mutation: EMAIL_VERIFY})
      await client.mutate({mutation: DELETE_TOKEN, variables: { id: token }})
      return { props: { success: true } };
    }
  } catch (error) {
    console.log('error: ', error);
  }

  return { props: { success: false } };
}

export default EmailVerifyPage
