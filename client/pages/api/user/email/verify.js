import nc from 'next-connect';
import getConfig from 'next/config';
import { sendMail } from 'libs/mail';
import { getLoginSession } from 'libs/auth';
import getClient from 'apollo';
import { CREATE_TOKEN } from 'src/operations/token';
import { ME } from 'src/operations/user';

const { publicRuntimeConfig } = getConfig()
const handler = nc();

handler.post(async (req, res) => {
  try {
    const session = await getLoginSession(req)
    if (!session) { res.json(401).send('you need to be authenticated'); return; }
    const client = getClient(session.token)

    let tokenPayload = {
      type: 'emailVerify',
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }
    const token = await client.mutate({mutation: CREATE_TOKEN, variables: tokenPayload})
    
    const userRes = await client.query({query: ME})
    const msg = {
      to: userRes.data.me.email,
      from: publicRuntimeConfig.EMAIL_FROM,
      subject: `Verification email for costagarment [CAG Inc.]`,
      html: `
        <div>
          <p>Hello, ${userRes.data.me.name}</p>
          <p>Please follow <a href="${publicRuntimeConfig.BASE_PATH}/verify/email/${token.data.createToken.id}">this link</a> to confirm your email.</p>
        </div>
        `,
    };
    await sendMail(msg);
    res.end('ok');
  } catch (error) {
    console.log('error: ', error);
    res.status(400).end('Oops! something went wrong!')
  }
});

export default handler;
