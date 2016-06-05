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

import org.junit.FixMethodOrder;
import org.junit.runners.MethodSorters;
import com.thoughtworks.selenium.webdriven.WebDriverBackedSelenium;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;
@SuppressWarnings("deprecation")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
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
		//--------------------ARGUMENTY WEJSCIOWE------------------------
		String baseUrl = "http://localhost:3000/";
		nazwaInstytucji="testselenium";
		nazwaArtykulu="testartykulselenium";
		usernameAdmin="user123";
		passwordAdmin="user123";
		//---------------------------------------------------------------
		sciezkaZalacznika="C:\\Users\\DZONI\\Desktop\\Opis projektów.docx";
		zalacznik=false;
		//---------------------------------------------------------------
		
		driver = new FirefoxDriver();
		wait = new WebDriverWait(driver, 10);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		selenium = new WebDriverBackedSelenium(driver, baseUrl);
		actions = new Actions(driver);
	}
	
	private void zalogujAdmina(){
		selenium.click("//div[@id='react-root']/main/div/header/div[2]/div/div/div[2]/a/div[2]");
		selenium.type("id=username", usernameAdmin);
		selenium.type("id=password", passwordAdmin);
		selenium.click("css=div.modal-footer > #sign_in");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='react-root']/main/div/header/div[2]/div/div/div[3]/a/div[2]")));
	}
	
	@Test
	public void testALogowanie_Admin() throws Exception {
		selenium.open("/");
		System.out.println("Loguje sie na konto admina");
		zalogujAdmina();
		System.out.println("Wylogowuje sie z konta admina");
		
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='react-root']/main/div/header/div[2]/div/div/div[3]/a/div[2]")));
		
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		
		element.click();
		//selenium.click("//div[@id='react-root']/main/div/header/div[2]/div/div/div[3]/a/div[2]");
		//selenium.click("xpath=(//button[@type='button'])[3]");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//button[@type='button'])[3]")));
		
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		
		element.click();
	}
	
	@Test
	public void testBDodawanieInstytucji_Admin() throws Exception {
		selenium.open("/");
		//logowanie admina
		System.out.println("Loguje sie na konto admina");
		zalogujAdmina();
		System.out.println("Czekamy na znak dodawania instytucji (DUZY NIEBIESKI PLUS)");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("glyphiconPlusSign")));
		
		System.out.println("Dodaje instytucje");
		selenium.click("id=glyphiconPlusSign");
		
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("name")));
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
	public void testCDodawanieArtykuluInstytucji_Admin()throws Exception{
		System.out.println("----------testDodawanieArtykuluInstytucji_Admin()-------------");
		selenium.open("/i/"+nazwaInstytucji);
		System.out.println("Logujemy admina");
		zalogujAdmina();
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
				selenium.click("id=abtn");
				//assert czy nic nie dodalo
				continue;
			}
			System.out.println("Wypelniamy popup Dodaj Artykul");
			selenium.type("id=title", nazwaArtykulu);
			
			//selenium.type("//[@id='tinymce']/p", "testSelenium");
			selenium.type("//input[@id='author']",usernameAdmin);
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
		assertEquals(false,driver.getPageSource().contains("id=deleteArticleButton"));
		
	}
	@Test
	public void testDSlownik_Admin() throws Exception{
		System.out.println("----------testSlownik_Admin()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dictionaryLink")));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
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
	public void testEadministratorzy_Admin() throws Exception{
		System.out.println("----------administratorzy_Admin()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		System.out.println("Przenosimy sie na strone administratorow/Permissions");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='react-root']/main/div/header/div[2]/div/div/div[2]/a/div[2]")));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		selenium.click("//div[@id='react-root']/main/div/header/div[2]/div/div/div[2]/a/div[2]");
		
		
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
		selenium.click("css=#removeGlobalRight > div.modal-dialog > div.modal-content > div.modal-footer > button.btn.btn-default");
	}
	@Test
	public void testFwyszukiwarkaArtykulow() throws Exception
	{
		System.out.println("----------wyszukiwarkaArtykulow()-------------");
		selenium.open("/");
		selenium.click("id=menu1");
		//selenium.click("id="+nazwaInstytucji); <----------------------------------cos tu nie gra
		selenium.type("id=searchValue", nazwaInstytucji);
		selenium.click("//button[@type='button ']");
		selenium.waitForPageToLoad("10000");
		System.out.println("Sprawdzamy czy jest artykul");
		assertEquals(true,driver.getPageSource().contains(nazwaInstytucji));
	}
	@Test
	public void testGusuwanieArtykulow_Admin() throws Exception
	{
		System.out.println("----------usuwanieArtykulow()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		driver.navigate().refresh();
		System.out.println("Przenosimy sie na testowa instytucje");
		selenium.open("/i/"+nazwaInstytucji);
		selenium.waitForPageToLoad("10000");
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("deleteArticleButton")));
		System.out.println("Usuwamy artykul");
		selenium.click("id=deleteArticleButton");
		System.out.println("Sprawdzamy czy zostal usuniety");
		driver.navigate().refresh();
		System.out.println("Sprawdzamy czy istnieje usunieta instytucja");
		assertEquals(false,driver.getPageSource().contains("id=deleteArticleButton"));
	}
	
	@Test
	public void testHusuwanieInstytucji_Admin() throws Exception{
		System.out.println("----------usuwanieInstytucji()-------------");
		selenium.open("/");
		System.out.println("Logujemy admina");
		zalogujAdmina();
		element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("buttonRemuvetestselenium")));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
		Thread.sleep(500);
		selenium.click("id=buttonRemuvetestselenium");
		System.out.println("Sprawdzamy czy istnieje usunieta instytucja");
		assertEquals(false,driver.getPageSource().contains("id=buttonRemuvetestselenium"));
		
	}
	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}