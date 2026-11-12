import i18n, {
  changeLanguage,
  defaultLanguage,
  getDeviceLanguage,
  SUPPORTED_LANGUAGES,
} from '@/lib/i18n';

describe('i18n system', () => {
  beforeEach(async () => {
    await changeLanguage('it');
  });

  it('defines supported languages with Italian as default', () => {
    expect(SUPPORTED_LANGUAGES).toContain('it');
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(defaultLanguage).toBe('it');
  });

  it('detects a valid supported device language', () => {
    const detected = getDeviceLanguage();
    expect(SUPPORTED_LANGUAGES).toContain(detected);
  });

  it('translates keys in Italian', async () => {
    await changeLanguage('it');
    expect(i18n.t('home.title')).toBe('Chi paga?');
    expect(i18n.t('common.appName')).toBe('Pago Paolo');
    expect(i18n.t('common.switchTo', { lang: 'English' })).toBe(
      'Passa a English'
    );
  });

  it('translates keys in English after language switch', async () => {
    await changeLanguage('en');
    expect(i18n.t('home.title')).toBe('Who pays?');
    expect(i18n.t('common.appName')).toBe('Pago Paolo');
    expect(i18n.t('common.switchTo', { lang: 'Italiano' })).toBe(
      'Switch to Italiano'
    );
  });
});
