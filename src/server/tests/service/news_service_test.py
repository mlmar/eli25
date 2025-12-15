from unittest import TestCase

from service.news_service import get_top_articles

class NewsServiceTest(TestCase):
    def test_get_top_articles(self):
        """Test that get_top_articles returns articles as expected"""
        articles = get_top_articles()
        self.assertTrue(len(articles) > 0)