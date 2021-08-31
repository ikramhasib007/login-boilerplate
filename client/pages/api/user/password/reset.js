import nc from 'next-connect';
import { sendMail } from 'libs/mail';
import getClient from 'apollo';
import { GET_USER, RESET_PASSWORD } from 'src/operations/user';
import { CREATE_TOKEN, DELETE_TOKEN, GET_TOKEN } from 'src/operations/token';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const handler = nc();

handler.post(async (req, res) => {
  try {
    const client = getClient()
    const { body } = req
    let variables = { email: body.email }
    let { data, errors } = await client.query({query: GET_USER, variables})
    if(errors && errors[0].message === 'User error') return res.status(401).end('The email is not found');
    
    let tokenPayload = {
      creatorId: data.user.id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    }
    const token = await client.mutate({mutation: CREATE_TOKEN, variables: tokenPayload})

    const msg = {
      to: body.email,
      from: publicRuntimeConfig.EMAIL_FROM,
      subject: 'Reset your password [CAG Inc.]',
      html: `
        <div>
          <p>Hello, ${data.user.name}</p>
          <p>Please follow <a href="${publicRuntimeConfig.BASE_PATH}/auth/reset-password/${token.data.createToken.id}">this link</a> to reset your password.</p>
        </div>
        `,
    };
    await sendMail(msg);
    res.end('ok');
  } catch (error) {
    res.status(400).end('Oops! something went wrong!')
  }
});

// password reset
handler.put(async (req, res) => {
  try {
    const client = getClient()
    if (!req.body.password) {
      res.status(400).send('Password not provided');
      return;
    }

    const { data, errors } = await client.mutate({mutation: GET_TOKEN, variables: { id: req.body.token, type: 'passwordReset' }})

    if (errors) {
      res.status(403).send('This link may have been expired.');
      return;
    }

    let userUpdatePayload = { id: data.opsToken.creatorId, token: req.body.token, password: req.body.password }
    await client.mutate({mutation: RESET_PASSWORD, variables: userUpdatePayload})

    await client.mutate({mutation: DELETE_TOKEN, variables: { id: req.body.token }})

    res.end('ok');

  } catch (error) {
    res.status(400).end('Oops! something went wrong!')
  }
});

export default handler;
