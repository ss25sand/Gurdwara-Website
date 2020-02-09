/*
This is model code for the when I create an announcement section

try {
      const MY_QUERY = gql`{
        register
      }`;
      Cookies.set("email", this.state.email);
      Cookies.set("username", this.state.username);
      Cookies.set("password", this.state.password);
      const res = await this.props.client.query({ query: MY_QUERY });
      console.log(res);
      // set token cookies
    } catch (e) {
      console.log("error registering user:", e);
    } finally {
      Cookies.remove("email");
      Cookies.remove("username");
      Cookies.remove("password");
    }

    use `export default withApollo(ComponentName);` to get access to client!

 */
