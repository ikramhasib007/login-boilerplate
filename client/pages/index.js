import getClient from "apollo";
import { getLoginSession } from "libs/auth";
import Layout from "src/layouts"
import { ME } from "src/operations/user";

function Index() {
  return (
    <Layout />
  )
}

export async function getServerSideProps(context) {
  const session = await getLoginSession(context.req)
  let user = null;
  if(!!session) {
    const client = getClient(session.token)
    user = (session && (await client.query({query: ME})).data.me) ?? null
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {
      token: !!session ? session.token : '',
      user
    }
  }
}

export default Index
