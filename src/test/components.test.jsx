import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProductCard } from "../components/product/ProductCard";
import { CustomOrderPlanner } from "../components/home/CustomOrderPlanner";
import { SavedDrawer } from "../components/layout/SavedDrawer";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HomePage } from "../pages/HomePage";
import { siteConfig } from "../config/site";

const mockSampleProduct = {
  id: "test-prod-1",
  name: "Handmade Floral Keepsake",
  category: "flowers",
  shortDescription: "A delicate handmade sample piece.",
  price: null,
  availability: "ask",
  badge: "Popular Pick",
  isPlaceholder: true,
  image: {
    src: null,
    alt: "Sample image",
    placeholderTone: "rose",
  },
};

describe("ProductCard component", () => {
  beforeEach(() => {
    siteConfig.whatsappNumber = "";
  });

  it("renders 'Message for price' when price is null", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Message for price/i)).toBeInTheDocument();
  });

  it("'I'm Interested' button has href starting with DM URL, target='_blank', rel containing noopener/noreferrer, and aria-label containing product name", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const igLink = screen.getByRole("link", {
      name: new RegExp(`I'm interested in ${mockSampleProduct.name}`, "i"),
    });
    expect(igLink).toBeInTheDocument();
    expect(igLink.getAttribute("href")).toMatch(/^https:\/\/ig\.me\/m\/thelittlecornerbytasbiii/);
    expect(igLink).toHaveAttribute("target", "_blank");
    expect(igLink.getAttribute("rel")).toContain("noopener");
    expect(igLink.getAttribute("rel")).toContain("noreferrer");
    expect(igLink.getAttribute("aria-label")).toContain(mockSampleProduct.name);
  });

  it("clicking the button calls the clipboard helper with the product message and reveals the panel containing the product name", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const igLink = screen.getByRole("link", {
      name: new RegExp(`I'm interested in ${mockSampleProduct.name}`, "i"),
    });
    await act(async () => {
      fireEvent.click(igLink);
    });

    // Clipboard helper was called with the product inquiry message
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining(mockSampleProduct.name)
    );

    // Product name appears in the inquiry panel
    expect(
      screen.getByText(new RegExp(`Inquire about ${mockSampleProduct.name}`, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Instagram will open in a new tab\. Paste this message into your DM and review it before sending\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Copy message/i })
    ).toBeInTheDocument();

    // Never claims message was sent automatically
    expect(screen.queryByText(/message sent/i)).toBeNull();
    expect(screen.queryByText(/order placed/i)).toBeNull();
    expect(screen.queryByText(/order submitted/i)).toBeNull();
  });

  it("clipboard failure path shows the manual-copy message and does not throw", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Clipboard permission denied")),
      },
    });
    document.execCommand = vi.fn().mockReturnValue(false);

    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const igLink = screen.getByRole("link", {
      name: new RegExp(`I'm interested in ${mockSampleProduct.name}`, "i"),
    });

    // Clicking should not throw even if clipboard fails
    await act(async () => {
      expect(() => fireEvent.click(igLink)).not.toThrow();
    });

    // The failure message appears in polite aria-live
    await waitFor(() => {
      expect(
        screen.getByText(
          /Couldn't copy automatically\. Please select and copy the message above\./i
        )
      ).toBeInTheDocument();
    });
  });

  it("shows WhatsApp button as disabled with 'WhatsApp number not set yet' when number is empty", () => {
    siteConfig.whatsappNumber = "";
    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const waBtn = screen.getByRole("button", {
      name: /Inquire about Handmade Floral Keepsake on WhatsApp.*not set/i,
    });
    expect(waBtn).toBeDisabled();
    expect(screen.getAllByText(/WhatsApp number not set yet/i).length).toBeGreaterThan(0);
  });

  it("with a mocked configured number, the secondary WhatsApp link contains the encoded product name", () => {
    siteConfig.whatsappNumber = "919876543210";
    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const waLink = screen.getByRole("link", {
      name: /Inquire about Handmade Floral Keepsake on WhatsApp/i,
    });
    expect(waLink).toBeInTheDocument();
    expect(waLink.getAttribute("href")).toContain("wa.me/919876543210");
    expect(waLink.getAttribute("href")).toContain(
      encodeURIComponent("Handmade Floral Keepsake")
    );
  });

  it("toggles heart button aria-pressed on click", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockSampleProduct} />
      </BrowserRouter>
    );

    const heartBtn = screen.getByRole("button", {
      name: /Save Handmade Floral Keepsake/i,
    });
    expect(heartBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(heartBtn);
    expect(heartBtn).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(heartBtn);
    expect(heartBtn).toHaveAttribute("aria-pressed", "false");
  });
});

describe("CustomOrderPlanner form", () => {
  beforeEach(() => {
    siteConfig.whatsappNumber = "";
  });

  it("submitting opens the DM URL, displays the readable message, and never says 'sent' automatically", async () => {
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => {});

    render(<CustomOrderPlanner />);

    // Select Occasion
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Birthday" },
    });

    // Select Item
    fireEvent.change(screen.getByLabelText(/What would you like\?/i), {
      target: { value: "Flowers" },
    });

    // Enter Notes
    fireEvent.change(screen.getByLabelText(/Notes or ideas/i), {
      target: { value: "Pastel peach tone preferred" },
    });

    // Submit form with "Continue on Instagram"
    const submitBtn = screen.getByRole("button", {
      name: /Continue on Instagram/i,
    });
    fireEvent.click(submitBtn);
    if (windowOpenSpy.mock.calls.length === 0) {
      fireEvent.submit(submitBtn.closest("form"));
    }

    // Verify window.open was called with the DM URL
    expect(windowOpenSpy).toHaveBeenCalledWith(
      siteConfig.instagramDmUrl,
      "_blank",
      "noopener,noreferrer"
    );

    // Message block is revealed
    await waitFor(() => {
      expect(
        screen.getByText(/Ready to paste into your DM:/i)
      ).toBeInTheDocument();
    });

    const textarea = screen.getByLabelText(/Custom order message text/i);
    expect(textarea.value).toContain("• Occasion: Birthday");
    expect(textarea.value).toContain("• Item: Flowers");
    expect(textarea.value).toContain("• Notes: Pastel peach tone preferred");

    // Must never claim message was sent automatically
    expect(screen.queryByText(/Message sent/i)).toBeNull();
    expect(screen.queryByText(/Order submitted/i)).toBeNull();
    expect(
      screen.getByText(/Paste this message into your DM\. Nothing is sent or stored by this website\./i)
    ).toBeInTheDocument();

    windowOpenSpy.mockRestore();
  });
});

describe("Header and Footer Instagram links", () => {
  it("Header primary order link uses instagramDmUrl", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const dmLink = screen.getByRole("link", { name: /Message on Instagram/i });
    expect(dmLink).toHaveAttribute("href", siteConfig.instagramDmUrl);
  });

  it("Footer profile link uses instagramUrl and order link uses instagramDmUrl", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const profileLink = screen.getByRole("link", {
      name: new RegExp(`Visit The Little Corner on Instagram @${siteConfig.instagramHandle}`, "i"),
    });
    expect(profileLink).toHaveAttribute("href", siteConfig.instagramUrl);

    const dmLink = screen.getByRole("link", {
      name: /DM us to order on Instagram/i,
    });
    expect(dmLink).toHaveAttribute("href", siteConfig.instagramDmUrl);

    // Displays the handle
    expect(
      screen.getByText(`@${siteConfig.instagramHandle}`)
    ).toBeInTheDocument();
  });
});

describe("SavedDrawer component", () => {
  it("renders empty state or saved items with Instagram order action", () => {
    render(
      <BrowserRouter>
        <SavedDrawer isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Saved Gifts/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No saved pieces yet\. Tap the heart on anything you like\./i)
    ).toBeInTheDocument();
  });
});

describe("Home Page smoke test", () => {
  it("renders key section headings and content", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </HelmetProvider>
    );

    // Hero headline
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    // Featured Picks section title and updated subtitle
    expect(screen.getByText(/Handmade Picks/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A few of our favourites\. Message us on Instagram to order\./i)
    ).toBeInTheDocument();

    // Story section title
    expect(screen.getByText(/Made slowly, given warmly\./i)).toBeInTheDocument();

    // Packaging section title
    expect(screen.getByText(/Wrapped with care/i)).toBeInTheDocument();

    // Custom order section title
    expect(screen.getByText(/Custom Order Planner/i)).toBeInTheDocument();
  });
});
