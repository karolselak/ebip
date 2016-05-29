package testy;

import com.thoughtworks.selenium.Selenium;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.JavascriptExecutor;

import com.thoughtworks.selenium.webdriven.WebDriverBackedSelenium;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;
@SuppressWarnings("deprecation")
public class TestyFunkcjonalne {
	private Selenium selenium;
	private WebDriver driver;
	private Actions  actions;
	private WebDriverWait wait;
	private WebElement element;
	private String nazwaInstytucji,nazwaArtykulu,usernameAdmin,passwordAdmin,sciezkaZalacznika;
	private boolean zalacznik;
	@Before
	public void setUp() throws Exception {
		driver = new FirefoxDriver();
		wait = new WebDriverWait(driver, 10);
		String baseUrl = "http://localhost:3000/";
		selenium = new WebDriverBackedSelenium(driver, baseUrl);
		actions = new Actions(driver);
		
		nazwaInstytucji="testselenium";
		nazwaArtykulu="testartykulselenium";
		usernameAdmin="user123";
		passwordAdmin="user123";
		sciezkaZalacznika="C:\\Users\\DZONI\\Desktop\\Opis projektów.docx";
		zalacznik=false;
		
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}

	private void zalogujAdmina(){
		selenium.click("id=login-sign-in-link");
		selenium.type("id=login-username", usernameAdmin);
		selenium.type("id=login-password", passwordAdmin);
		selenium.click("id=login-buttons-password");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("login-name-link")));
	}
	@Test
	public void testLogowanie_Admin() throws Exception {
		selenium.open("/");
		System.out.println("Loguje sie na konto admina");
		zalogujAdmina();
		System.out.println("Wylogowuje sie z konta admina");
		selenium.click("id=login-name-link");
		selenium.click("id=login-buttons-logout");
	}
	
	@Test
	public void testDodawanieInstytucji_Admin() throws Exception {
		selenium.open("/");
		
		//logowanie admina
		System.out.println("Loguje sie na konto admina");
		zalogujAdmina();
		driver.navigate().refresh();		//problem nr.1 plus sie nie wyswietla od razu, wymagany F5
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("glyphiconPlusSign")));
		
		System.out.println("Dodaje instytucje");
		selenium.click("id=glyphiconPlusSign");
		
		System.out.println("Wypelniam popup");
		selenium.type("id=name", nazwaInstytucji);
		selenium.type("id=streetAddress", "testselenium");
		selenium.type("id=addressLocality", "testselenium");
		selenium.type("id=postalCode", "03-003");
		selenium.type("id=email", "testselenium@gmail.com");
		selenium.type("id=telephone", "555555555");
		selenium.type("id=numberOfEmployees", "1");
		
		System.out.println("Akceptuje popup");
		selenium.click("css=button.btn.btn-success");
	}
	@Test
	public void testDodawanieArtykuluInstytucji_Admin()throws Exception{
		System.out.println("----------testDodawanieArtykuluInstytucji_Admin()-------------");
		selenium.open("/i/"+nazwaInstytucji);
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		for(int i=0; i<2;i++)
		{
			System.out.println("Otwieramy popup Dodaj Artykul");
			element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn.btn-info")));
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
			Thread.sleep(500);
			selenium.click("css=button.btn.btn-info");
			
			if(i==0)
			{		
				System.out.println("Anuluj dodawanie artykulu");
				element = driver.findElement(By.id("abtn"));
				//((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
				//Thread.sleep(500); 
				selenium.click("id=abtn");
				continue;
			}
			System.out.println("Wypelniamy popup Dodaj Artykul");
			selenium.type("id=title", "testSelenium");
			selenium.type("id=content", "testSElenium");
			//selenium.click("xpath=(//button[@id='menu1'])[1]");
			selenium.click("css=#author > #menu1");
			selenium.click("css=#author > #menu1");
			if(zalacznik)
			{
				System.out.println("Dodajemy zalacznik");
				selenium.type("id=file", sciezkaZalacznika);
			}
			switch (i){
				case 0:
					System.out.println("Publikacja artykulu");
					selenium.click("id=pbtn");
					break;
				case 1:
					System.out.println("Zapisanie wersji roboczej");
					selenium.click("id=sbtn");
					break;
				default:
					break;
			}
		}
		
	}
	@Test
	public void testSlownik_Admin() throws Exception{
		System.out.println("----------testSlownik_Admin()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dictionaryLink")));
		selenium.click("id=dictionaryLink");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("button.btn.btn-info")));
		for(int i=0;i<2;i++)
		{
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
			Thread.sleep(500);
			System.out.println("Dodajemy pusty typ do slownika");
			selenium.click("id=addType");
			switch(i){
			case 0:
				System.out.println("Naciskamy publikuj");
				selenium.click("id=buttonAddType");
				break;
			case 1:
				System.out.println("Naciskamy anuluj");
				selenium.click("id=buttonCancelType");
				break;
			default:
				break;
			}
		}
	}
	@Test
	public void administratorzy_Admin() throws Exception{
		System.out.println("----------administratorzy_Admin()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		System.out.println("Przenosimy sie na strone administratorow/Permissions");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@id='administratorsLink']/div[2]")));
		selenium.click("//a[@id='administratorsLink']/div[2]");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(usernameAdmin)));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		
		System.out.println("Dodawanie uprawnien globalnych popup");
		selenium.click("id="+usernameAdmin);
		System.out.println("Akceptuj");
		selenium.click("css=button.btn.btn-success");
		
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(usernameAdmin)));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		System.out.println("Usuwanie uprawnien globalnych popup");
		selenium.click("css=div > #"+usernameAdmin);
		System.out.println("Anuluj");
		selenium.click("css=#remuveGlobalRight > div.modal-dialog > div.modal-content > div.modal-footer > button.btn.btn-default");
	}
	@Test 
	public void wyszukiwarkaArtykulow() throws Exception
	{
		System.out.println("----------wyszukiwarkaArtykulow()-------------");
		selenium.open("/");
		selenium.type("id=searchValue", "testselenium");
		selenium.click("//button[@type='button ']");
		selenium.waitForPageToLoad("10000");
		assertEquals(true,driver.getPageSource().contains(nazwaInstytucji));
	}
	@Test
	public void usuwanieArtykulow_Admin() throws Exception
	{
		System.out.println("----------usuwanieArtykulow()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		System.out.println("Przenosimy sie na testowa instytucje");
		selenium.open("/i/"+nazwaInstytucji);
		selenium.waitForPageToLoad("10000");
		driver.navigate().refresh();
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("deleteArticleButton")));
		System.out.println("Usuwamy artykul");
		selenium.click("id=deleteArticleButton");
	}
	
	/*@Test
	public void usuwanieInstytucji_Admin() throws Exception{
		System.out.println("----------usuwanieArtykulow()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		//System.out.println(driver.findElement(By.xpath("//*div[@id='hompeCont']//contains(.,'testSelenium')")));
		//System.out.println(driver.findElement(By.xpath("//*[contains(concat(' ', @class, ' '), ' tile1 ')]")));
		//element = findElement(By.xpath("//*[@test-id='test-username']");
		//element = findElement(By.xpath("//input[@test-id='test-username']");
		//selenium.click("xpath='//div[contains(text(), "+nazwaInstytucji+") and @class='btn']' ");
		
	}*/
	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}