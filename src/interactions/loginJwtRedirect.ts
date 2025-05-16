// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

interface Event {
  isValid: boolean;
  jwtToken: string;
  refreshToken: string;
  redirectUrl: string;
}

function loginJwtRedirect({ event }: { event: Event }): void {
  // @ts-ignore
  console.log('Event:', event);

  // @ts-ignore
  const { isValid, jwtToken, refreshToken, redirectUrl } = event;

  // @ts-ignore
  console.log('Redirect:', redirectUrl);
  if (isValid) {
    const decodedToken = JSON.parse(window.atob(jwtToken.split('.')[1]));
    if (decodedToken && decodedToken.locale) {
      document.cookie = `BBLocale=${decodedToken.locale};path=/`;
    }

    localStorage.setItem('TOKEN', jwtToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    // eslint-disable-next-line no-restricted-globals
    history.push(redirectUrl);
  }
}
