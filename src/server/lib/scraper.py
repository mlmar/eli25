from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import TimeoutException

# Create driver with necessary parameters
def __create_driver() -> WebDriver:
    """Creates headless Chrome webdriver"""

    arguments = [
        '--headless=new'
        '--disable-gpu'  # Recommended for headless mode
        '--disable-renderer-backgrounding'
        '--disable-background-timer-throttling'
        '--disable-backgrounding-occluded-windows'
        '--disable-dev-shm-usage'  # Helps with resource limits
        '--no-sandbox'  # Try if running in a containerized environment
    ]
    
    options = Options()
    options.page_load_strategy = 'none'
    for arg in arguments:
        options.add_argument(arg)

    driver = webdriver.Chrome(options=options)
    return driver

def read_page(url) -> str:
    """Returns body html from url"""

    driver = __create_driver()
    try:
        wait = WebDriverWait(driver, 10)
        driver.get(url)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'p'))) # Wait until paragraphs load
    except TimeoutException:
        print(f'Timed out while loading {url}')
    
    print(f'Successfully fetched {url}')

    content_tags = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'li',
        'summary',
        'details',
        'p',
        'label',
        'details'
    ]

    elements = driver.find_elements(By.CSS_SELECTOR, ','.join(content_tags)) # get common content elements
    values = [element.get_attribute('innerText') for element in elements] # get inner text
    result = '\n'.join(values)
    return result