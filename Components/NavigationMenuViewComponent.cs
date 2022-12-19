using Microsoft.AspNetCore.Mvc;

namespace GaijinStore.Components
{
    public class NavigationMenuViewComponent : ViewComponent
    {
        private IStoreRepository repository;
        public NavigationMenuViewComponent(IStoreRepository repository)
        {
            this.repository = repository;
        }
        public IViewComponentResult Invoke()
        {
            return View(repository.Products
                .Select(p => p.Category)
                .Distinct()
                .OrderBy(p => p));
        }
    }
}
